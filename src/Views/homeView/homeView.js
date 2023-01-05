import "./homeView.css"

function HomeView(props){

    function clickSignOut(){
        props.onClickSignOut()
    }

    return <div className="container">
        <div id= "contentCard">
            <p>Welcome, you're now logged in!</p>
            <button onClick={clickSignOut}>Sign out</button>

        </div>

    </div>
}

export default HomeView;