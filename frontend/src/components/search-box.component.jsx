import { useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'

/** UI Elements */
import { Form, Button } from 'react-bootstrap'

const SearchBox = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const urlKeyword = searchParams.get('keyword')

  const [keyword, setKeyword] = useState(urlKeyword || '')

  const submitHandler = (e) => {
    e.preventDefault()

    if (keyword.trim()) {
      navigate(`/search/?keyword=${keyword}`)
      setKeyword('')
    } else navigate('/')
  }

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        placeholder='Search products...'
        value={keyword}
        className='mr-sm-2 ml-sm-5'
      />
      <Button type='submit' variant='outline-light' className='p-2 mx-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
