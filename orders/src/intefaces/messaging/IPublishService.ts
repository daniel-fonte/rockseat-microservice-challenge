export default interface IPublishService<T> {
    execute(payload: T): Promise<void>
}