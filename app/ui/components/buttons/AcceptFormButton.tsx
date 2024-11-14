type Props = {
    msg: string;
    name?: string;
    id?: string;
    value?: string;
};

const AcceptFormButton = (props: Props) => {
    return (
        <div
            className='text-xl w-28 bg-blue-500 text-center py-2 rounded-md text-white transition hover:bg-blue-800 hover:text-slate-300 hover:border-transparent active:scale-95'>
            <button
                type="submit"
                name={props.value}
                id={props.value}
                value={props.value}
            >
                {props.msg}
            </button>
        </div>
    )
}

export default AcceptFormButton