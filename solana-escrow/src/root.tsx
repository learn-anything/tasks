// @refresh reload
import { Suspense } from "solid-js"
import {
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title
} from "solid-start"
import "./root.css"
import { GlobalStateProvider, createGlobalState } from "./GlobalContext/global"

export default function Root() {
  const global = createGlobalState()

  return (
    <Html lang="en">
      <Head>
        <Title>Buy - Learn Anything</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
        <Suspense>
          <ErrorBoundary>
            <GlobalStateProvider value={global}>
              <Routes>
                <FileRoutes />
              </Routes>
            </GlobalStateProvider>
          </ErrorBoundary>
        </Suspense>
        <Scripts />
      </Body>
    </Html>
  )
}
