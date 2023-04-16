import RouteIssueForm from "./RouteIssueForm";

export default function App() {
  return(
    <div>
      <h1>Submit Route Issue</h1>
      <RouteIssueForm />
    </div>
  );
}
/*
window.onload = () => {
  const db = getFirestore(Firebase);
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
};
*/