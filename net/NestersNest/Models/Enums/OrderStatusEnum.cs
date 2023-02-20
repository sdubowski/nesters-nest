using Microsoft.Build.Framework;

namespace NestersNest.Enums;

public enum OrderStatusEnum
{
    Draft = 1,
    Approved = 2,
    InProgress = 3,
    Canceled = 4,
    CanceledByTheDriver = 5,
    TransferredToTheTransportExchange = 6,
    WaitingForDriver = 7,
    Loaded = 8,
    Done = 9
}