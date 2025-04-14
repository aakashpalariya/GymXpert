namespace Repository.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IGymRepository GymRepository { get; }
        IMemeberRepository MemeberRepository { get; }
        IPlanRepository PlanRepository { get; }
        IMasterRepository MasterRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}
