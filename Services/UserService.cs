﻿using AutoMapper;
using Microsoft.AspNetCore.Http;
using MyFinancialTracker.Data;
using MyFinancialTracker.Data.Entities;
using MyFinancialTracker.Models;
using MyFinancialTracker.Models.ApiRequestModels;
using MyFinancialTracker.Models.ApiResponseModels;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyFinancialTracker.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetByGuid(string guid);
        Guid Create(RegisterRequestModel user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
        List<Item> GetItemsForUser();
        void RemoveItemForUser(string institutionId);
    }
    public class UserService: IUserService
    {
        private MyFinancialTrackerDbContext _dbContext;
        private IHttpContextAccessor _httpContextAccessor;
        private IMapper _mapper;
        public UserService(MyFinancialTrackerDbContext dbContext, IHttpContextAccessor httpContextAccessor, IMapper mapper)
        {
            _dbContext = dbContext;
            _httpContextAccessor = httpContextAccessor;
            _mapper = mapper;
        }

        public Guid Create(RegisterRequestModel registerModel, string password)
        {
            // map model to entity
            var user = _mapper.Map<User>(registerModel);
            var userInfo = _mapper.Map<UserInfo>(registerModel);

            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new Exception("Password is required");

            if (_dbContext.Users.Any(x => x.UserName == user.UserName))
                throw new Exception("Username \"" + user.UserName + "\" is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            var createdUserId = _dbContext.Users.SingleOrDefault(x => x.UserName == user.UserName).UserGuid;

            userInfo.UserGuid = createdUserId;

            _dbContext.UserInfos.Add(userInfo);
            _dbContext.SaveChanges();

            return createdUserId;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username))
                throw new ArgumentNullException(username);
            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException(password);

            var user = _dbContext.Users.SingleOrDefault(x => x.UserName == username);

            // check if username exists
            if (user == null)
                throw new Exception("User doesn't Exist!");

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new Exception("Password is wrong!");

            // authentication successful
            return user;
        }

        public IEnumerable<User> GetAll()
        {
            return _dbContext.Users;
        }

        public User GetByGuid(string guid)
        {
            return _dbContext.Users.Where(x=>x.UserGuid == new Guid(guid)).FirstOrDefault();
        }

        public void Update(User userParam, string password = null)
        {
            var user = _dbContext.Users.Find(userParam.Id);

            if (user == null)
                throw new Exception("User not found");

            // update username if it has changed
            if (!string.IsNullOrWhiteSpace(userParam.UserName) && userParam.UserName != user.UserName)
            {
                // throw error if the new UserName is already taken
                if (_dbContext.Users.Any(x => x.UserName == userParam.UserName))
                    throw new Exception("UserName " + userParam.UserName + " is already taken");

                user.UserName = userParam.UserName;
            }

            // update password if provided
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _dbContext.Users.Update(user);
            _dbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            var user = _dbContext.Users.Find(id);
            if (user != null)
            {
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
            }
        }

        public List<Item> GetItemsForUser()
        {
            var currentUserGuid = _httpContextAccessor.HttpContext.User.Identity.Name;
            return _dbContext.Items.Where(x => x.UserGuid == new Guid(currentUserGuid)).ToList();
        }

        public void RemoveItemForUser(string institutionId)
        {
            var currentUserGuid = _httpContextAccessor.HttpContext.User.Identity.Name;
            var itemToBeDeleted = _dbContext.Items.Where(x => x.UserGuid == new Guid(currentUserGuid) && x.InstitutionId == institutionId).FirstOrDefault();
            _dbContext.Items.Remove(itemToBeDeleted);

            _dbContext.SaveChanges();
        }



        #region helper methods

        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }

        #endregion
    }
}
