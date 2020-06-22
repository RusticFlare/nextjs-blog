import Layout from 'components/layout'
import { getAllPostIds, getPostData } from 'lib/posts'
import Head from 'next/head'
import Date from 'components/date'
import utilStyles from 'styles/utils.module.css'
import { GetStaticProps, GetStaticPaths } from 'next'
import { getPerson } from 'lib/graph-cms'

export default function Post({
  postData,
  person
}: {
  postData: {
    title: string
    date: string
    contentHtml: string
  }
  person: {
    name: string,
    profilePicture: { handle: string, width: number, height: number }
    openGraphImage: { url: string }
  }
}) {
  return (
    <Layout person={person}>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string)
  const person = await getPerson()
  return {
    props: {
      postData,
      person
    }
  }
}
