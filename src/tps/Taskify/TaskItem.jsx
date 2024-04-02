export default function TaskItem({tasks}){
    return(
        <>
           <tr>
                        <td>{tasks.id}</td>
                        <td>{tasks.name}</td>
                        <td>{tasks.status}</td>
                    </tr>
        </>
    )
}