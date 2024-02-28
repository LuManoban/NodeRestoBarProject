export const paginationFields = (page, perPage) => {
  let offset = 0;
  if (page > 1) offset = page * perPage - perPage;
  return { limit: perPage, offset };
};

export const paginationSerialize = (records, page, perPage) => {
  const { count, rows } = records;
  const totalPages = Math.ceil(count / perPage);

  return {
    results: rows,
    pagination: {
      totalRecords: count,
      totalPages,
      perPage,
      currentPage: page,
    },
  };
};
