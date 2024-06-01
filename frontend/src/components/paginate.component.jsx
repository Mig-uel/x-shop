import { Pagination } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
  const navigate = useNavigate()

  const searchParamsHandler = (path, p) => {
    navigate({
      pathname: path,
      search: !keyword
        ? `?pageNumber=${p}`
        : `?keyword=${keyword}&pageNumber=${p}`,
    })
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((p) => (
          <div key={p + 1}>
            <Pagination.Item
              active={p + 1 === page}
              onClick={() =>
                searchParamsHandler(
                  !isAdmin ? (keyword ? '/search' : `/`) : `/admin/productlist`,
                  p + 1
                )
              }
            >
              {p + 1}
            </Pagination.Item>
          </div>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
