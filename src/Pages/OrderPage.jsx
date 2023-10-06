import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getOrder } from 'src/services/orders';
import 'src/styles/orders/order.scss';

const InfoItem = ({ label, value }) => (
  <div className='order__info-item'>
    <strong>{label}: </strong>
    <p>{value ?? ""}</p>
  </div>
)

function OrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading } = useQuery({ queryKey: ['order', id], queryFn: ({ queryKey }) => getOrder(queryKey[1]) })

  const onRedirect = () => {
    navigate('/');
  }

  if (isLoading) return (
    <p>Loading ....</p>
  )

  return (
    <div className="order__wrapper">
      <div className="order__container">
        <div className="order__info-section">
          <InfoItem label="Codigo de pedido" value={data.order} />
          <InfoItem label="Cliente" value={`${data?.client?.name ?? ''} ${data?.client?.last_name ?? ''}`} />
          <InfoItem label="Direccion de entrega" value={data?.delivery_address} />
        </div>
        <div className="order__products-table">
          <table>
            <thead>
              <tr>
                <th>Nombre de Producto</th>
                <th>Ref</th>
                <th>Cantidad</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((p) => (
                <tr key={p.product.id}>
                  <td>{p.product?.name}</td>
                  <td>{p?.product?.reference}</td>
                  <td>{p?.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="order__info-section">
          <InfoItem label="Estado del pedido" value={data?.status} />
          <InfoItem label="Fecha estimada de entrega" value={data?.delivery_date} />
        </div>
        <div className="order__actions">
          <button className='order__btn order__btn--error' type="button" onClick={onRedirect}>Cerrar</button>
          <button className='order__btn' type="button" onClick={onRedirect}>Nueva consulta</button>
        </div>
      </div>
    </div>
  )
}

export default OrderPage;