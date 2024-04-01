import { Layout } from "./Layout";

export const PageLayout = (props) => {
  return (
    <div className="mb-32">
      <Layout {...props}></Layout>
    </div>
  )
}