const pagination = (res, req, response ) => {
    const {data, query, total, limit, offset, status, message, error} = response;
      
      const totalPage = Math.ceil(total / limit);
      const path = `http://${req.get('host') + req.baseUrl + req.route.path}?page`;
      console.log(req.query);
      let {page} = req.query;
      page = parseInt(page)
      let queryString = ''
      Object.keys(query).forEach((key) => {
        if (key !== 'page' && key !== 'path') {
          queryString += `&${key}=${query[key]}`;
        }
      });
      const prevLink = (page !== 1 ? `${path}=${page - 1}${queryString}` : null);
      const nextLink = (page !== totalPage ? `${path}=${page + 1}${queryString}` : null);
  
      const resultPrint = {
        offset: offset ?? null,
        limit: limit || null,
        total_data: total || 0,
        total_page: totalPage || 0,
        perv_link: prevLink || null,
        next_link: nextLink || null,
        message: message || null,
        status: status ?? 500,
        err: error || null,
        data: data ?? null,
      };
      
    res.status(status || 500).json(resultPrint)
    }
    
    module.exports = pagination;