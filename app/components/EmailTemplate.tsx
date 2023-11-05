import * as React from "react";

interface Props {
  firstName: string;
}

const EmailTemplate: React.FC<Readonly<Props>> = ({ firstName }: Props) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
);

export default EmailTemplate;
