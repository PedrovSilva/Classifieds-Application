using System.Collections.Generic;

namespace ClassificadosApi.DTOs
{
    public sealed class PagedResultDto<T>
    {
        public IReadOnlyList<T> Items { get; init; } = [];
        public int Page { get; init; }
        public int PageSize { get; init; }
        public int TotalItems { get; init; }
        public int TotalPages { get; init; }

    }
}