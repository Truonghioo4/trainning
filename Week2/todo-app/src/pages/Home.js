import { CalloutCard, Card, FormLayout, Layout, Page } from "@shopify/polaris"

const Home = () => {
  return (
    <Page title="Home">
      <Layout>
        <Layout.Section>
          <CalloutCard
            title="Welcome to AVADA Development"
            illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
            primaryAction={{
              content: 'Go to Todos',
              url: '/todos',
            }}
          >
            <p>Upload your stores logo, change colors and fonts, and more.</p>
          </CalloutCard>
        </Layout.Section>

        <Layout.Section>
          <Card>
            <FormLayout>
              <p>Search</p>
            </FormLayout>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  )
}


export default Home
