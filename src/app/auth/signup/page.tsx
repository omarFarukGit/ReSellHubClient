import { Suspense } from "react";
import SignUpPage from "./SignUpPage";


export default function Page() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <SignUpPage/>
    </Suspense>
  );
}