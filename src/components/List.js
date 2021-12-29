
const List = ({ listItems}) => {
    return (
        <div className='prose mb-10 mx-auto max-w-full w-full'>
            <ul className='list-none '>
                {listItems.map((listItem, index) => (
                    <li key={index} className={'border-b py-2 my-0 flex justify-between items-center '  + listItem.status }>
                        <span className='flex-grow'>{listItem.item}</span>
                        {listItem.quantity ? <span className='flex-grow-0'>{listItem.quantity}</span> : '' }
                    </li> 
                ))}
            </ul>
        </div>
    )
}

export default List
 