import { useParams } from 'react-router-dom';

type BusinessParams = { siren: string };

export default function BusinessScreen() {
  const { siren } = useParams<BusinessParams>();
  return <h1>{siren}</h1>;
}
