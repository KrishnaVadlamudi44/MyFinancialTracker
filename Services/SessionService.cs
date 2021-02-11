using MyFinancialTracker.Data;
using MyFinancialTracker.Data.Entities;
using System;
using System.Linq;

namespace MyFinancialTracker.Services
{
    public interface ISessionService
    {
        Guid CreateSession(Guid userGuid);

        Session GetSession(Guid sessionGuid);

        void UpdateSession(Guid sessionGuid, Session session);
    }

    public class SessionService : ISessionService
    {
        private MyFinancialTrackerDbContext _dbContext;
        public SessionService(MyFinancialTrackerDbContext dataContext)
        {
            _dbContext = dataContext;
        }

        public Guid CreateSession(Guid userGuid)
        {
            _dbContext.Sessions.Add(new Session()
            {
                UserUuid = userGuid,
                SessionInfo = "{}",
                Expiry = DateTime.Now.AddHours(2)
            });

            _dbContext.SaveChanges();

            var createdSession = _dbContext.Sessions.Where(x => x.UserUuid == userGuid).FirstOrDefault();

            return createdSession.SessionUuid;
        }

        public Session GetSession(Guid sessionguid)
        {
            return _dbContext.Sessions.Where(x => x.SessionUuid == sessionguid).FirstOrDefault();
        }

        public void UpdateSession(Guid sessionGuid, Session session)
        {
            var currentSession = _dbContext.Sessions.Where(x => x.SessionUuid == session.SessionUuid).FirstOrDefault();

            currentSession.SessionInfo = session.SessionInfo;
            _dbContext.Sessions.Update(currentSession);

            _dbContext.SaveChanges();
        }
    }
}
