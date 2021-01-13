using MyFinancialTracker.Data;
using MyFinancialTracker.Data.Entities;
using System;
using System.Linq;

namespace MyFinancialTracker.Services
{
    public interface ISessionService
    {
        Guid CreateSession(Session session);

        Session GetSession(Guid userGuid);

        void UpdateSession(Session session);
    }

    public class SessionService : ISessionService
    {
        private MyFinancialTrackerDbContext _dbContext;
        public SessionService(MyFinancialTrackerDbContext dataContext)
        {
            _dbContext = dataContext;
        }

        public Guid CreateSession(Session session)
        {
            _dbContext.Sessions.Add(session);

            _dbContext.SaveChanges();

            return _dbContext.Sessions.Find(session.Id).SessionUuid;
        }

        public Session GetSession(Guid userGuid)
        {
            return _dbContext.Sessions.Where(x => x.UserUuid == userGuid).FirstOrDefault();

        }

        public void UpdateSession(Session session)
        {
            var currentSession = _dbContext.Sessions.Where(x => x.SessionUuid == session.SessionUuid).FirstOrDefault();

            currentSession.SessionInfo = session.SessionInfo;
            _dbContext.Sessions.Update(currentSession);

            _dbContext.SaveChanges();
        }
    }
}
