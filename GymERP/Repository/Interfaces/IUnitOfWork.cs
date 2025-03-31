namespace Repository.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        IGymRepository GymRepository { get; }
        IMemeberRepository MemeberRepository { get; }

        Task<bool> Complete();
        bool HasChanges();
    }
}
