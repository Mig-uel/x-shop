import { Helmet } from 'react-helmet-async'

const Meta = ({
  title = 'X-Shop',
  description = 'The only shop you need for your electronic needs',
  keywords = 'electronics, buy electronics, cheap electronics',
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  )
}

export default Meta
