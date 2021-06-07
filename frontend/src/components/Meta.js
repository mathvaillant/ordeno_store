import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Bem vindo à Ordenô Store | Home',
  description:
    'O melhor lugar para comprar acessórios masculinos da atualidade',
  keywords: 'bolsas masculinas, comprar acessórios masculinos, acessórios',
}

export default Meta
