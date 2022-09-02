import {buy} from "../../../../services/sharesService";
import {useState} from "react";
import {Alert} from "../../../../components";

function BuySharesForm(
    {
        order,
        setOrder,
        user,
        accountStat,
        totalShares,
        setTotalShares,
        setNotification
    }) {
    const [buyQuantity, setBuyQuantity] = useState(1);

    const buySharesHandler = (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const {quantity} = Object.fromEntries(formData);

        const totalCost = (quantity * order.price) * 1.1;

        if (totalCost > accountStat.balance) {
            setNotification(<Alert alertType={'Error'}
                                   message={'Not Enough Money in Account Balance!'}/>)
            setTimeout(() => {
                setNotification(undefined);
            }, 1500)
            return;
        }
        const orderOwnerId = order.userId;
        buy(orderOwnerId, quantity, order.id, user.token)
            .then(() => {
                setNotification(<Alert alertType={'Success'}
                                       message={`Successfully Purchased ${quantity} Shares!`}/>)
                setTotalShares(totalShares - quantity);
                const newQuantity = order.quantity - quantity;
                setOrder(prevState => ({
                    ...prevState,
                    quantity: newQuantity
                }))
            }).catch(err => {
            setNotification(<Alert alertType={'Error'}
                                   message={err.message}/>)
        })
        setTimeout(() => {
            setNotification(undefined);
        }, 1500)
    }

    return (
        <>
            <h3 className="text-center text-lg mt-5">
                Available Shares in this order:
                <strong> {order.quantity}</strong>
            </h3>
            <form id={'modalForm'} onSubmit={buySharesHandler}
                  className={'flex justify-center items-center my-5 text-lg'}>
                <label>
                    Quantity:
                    <input name={'quantity'}
                           onChange={(e) => setBuyQuantity(() => {
                               try {
                                   const orderQuantity = order.quantity;
                                   let quantity = Number(e.target.value);
                                   if (orderQuantity < quantity) {
                                       return orderQuantity;
                                   } else if (e.target.value <= 0) {
                                       return 1;
                                   } else {
                                       return quantity;
                                   }
                               } catch (err) {
                                   console.log(err)
                                   return 1;
                               }
                           })}
                           className={'ml-3 py-1 px-3 border border-gray-300 bg-gray-100 rounded-md w-36'}
                           type="number" placeholder={'1'} value={buyQuantity} required/>
                </label>
                <div className={'ml-5'}>
                    Total: <strong>${((buyQuantity * order.price) * 1.1).toFixed(4)}</strong>
                </div>
            </form>
        </>
    )
}

export default BuySharesForm;