import { Link } from "@remix-run/react";

import { Button, Page, Layout } from "@shopify/polaris";



export default function Index() {
  return (
    <Page title="Home"
      secondaryActions={
        <Link to="/settings">
          <Button>
            Settings
          </Button>
        </Link>
      }
    >
      <Layout>
        <Layout.Section>
          This is index page
        </Layout.Section>
      </Layout>
    </Page>
  );
}
