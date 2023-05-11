import { Page, Layout, Form, FormLayout, Checkbox, TextField, Button } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { Link } from "@remix-run/react";

const APIHostname: string = process.env.API_HOSTNAME;

export default function Settings() {
  const [token, setToken] = useState('');

  const handleSubmit = useCallback(() => {
    console.log('submitted')
  }, []);


  return (
    <Page title="Settings"
      secondaryActions={
        <Link to="/">
          <Button>
            Back
          </Button>
        </Link>
      }
    >
      <Layout>
        <Layout.Section>
          <Form onSubmit={handleSubmit}>
            <FormLayout>
              <TextField
                value={token}
                onChange={value => setToken(value)}
                label="Token"
                type="text"
                autoComplete=""
                helpText={
                  <span>
                    You should get this from a place.
                  </span>
                }
              />
              <Button submit>Submit</Button>
            </FormLayout>
          </Form>
        </Layout.Section>
      </Layout>
    </Page>
  )
}
