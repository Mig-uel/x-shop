import { Pagination } from 'react-bootstrap'
import { useSearchParams, useNavigate, useParams } from 'react-router-dom'

const Paginate = ({ pages, page, isAdmin = false }) => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const searchParamsHandler = (path, p) => {
    setSearchParams('pageNumber', p)
    navigate({
      pathname: path,
      search: `?pageNumber=${p}`,
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
                  !isAdmin ? `/` : `/admin/productlist/`,
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
