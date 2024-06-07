export default function Section(props){
    return <section className={props.className} >
        {props.children}
    </section>
};