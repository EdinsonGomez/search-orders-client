import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from 'src/components/form/Form';
import { getDocumentTypes } from 'src/services/clients';
import { searchOrder } from 'src/services/orders';
import 'src/styles/home/home.scss';

function Home() {
  const navigate = useNavigate();
  const queryDocumentTypes = useQuery({ queryKey: ['documentTypes'], queryFn: getDocumentTypes });
  const [error, setError] = useState("");

  const onSubmit = (data) => {
    setError("");

    if (!data.order || !data.document_type || !data.document) {
      setError('LLena todos lo campos obligatorios');
      return
    }

    searchOrder({...data})
      .then((res) => {
        if (res.id) {
          navigate(`/orders/${res.id}`);
        } else {
          setError('No hemos podido encontrar el pedido');
        }
      })
      .catch(() => {
        setError("No hemos podido encontrar el pedido");
      })
  }

  const formConfig = useMemo(() => ({
    content: {
      create: {
        items: [
          {
            key: "order",
            type: "text",
            name: "order",
            label: "Codigo de pedido",
            placeholder: "Ej: 23412"
          },
          {
            key: "document_type",
            type: "select",
            name: "document_type",
            label: "Tipo de documento",
            options: queryDocumentTypes.data ?? []
          },
          {
            key: "document",
            type: "text",
            name: "document",
            label: "Documento"
          },
          {
            type: 'action',
            text: 'Consultar',
            config: {
              color: 'primary'
            }
          }
        ]
      }
    }
  }), [queryDocumentTypes.data])

  return (
    <div className="home__wrapper">
      <Form
        error={error}
        onSubmit={onSubmit}
        config={formConfig}
      />
    </div>
  )
}

export default Home;