type Props = {
    msg: string;
    name?: string;
    // lastname?:string;
    id?: string;
    value?: string;
};

const AcceptFormButton = (props: Props) => {
    return (
        <div
            className='w-full text-lg bg-blue-500 text-center py-2 rounded-md text-white transition hover:bg-blue-800 hover:text-slate-300 hover:border-transparent active:scale-95'>
            <button
                className="w-full"
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