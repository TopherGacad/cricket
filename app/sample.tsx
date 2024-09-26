"use client";

import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Redirect logic (ensure it doesn't wrongly trigger for refreshes)
    if (!pathname.startsWith("/dashboard")) {
      router.push("/dashboard");
    }
  }, [pathname, router]);

  return <Component {...pageProps} />;
}

export default MyApp;
