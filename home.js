const apptag = document.getElementById("app");




class Input extends React.Component {
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e){
        this.props.changeValue(e.target.value);
    }

    render(){
        return(
                <div>
                <input onChange={this.handleChange} type="text" value={this.props.value} />
                </div>
              );
    }

}




class AddMenu extends React.Component {
    constructor(props){
        super(props);

        this.state = {changes : 0};

        this.dish = this.props.dish;
        this.ingredient = this.props.ingredient;

        this.changeValue = this.changeValue.bind(this);
        this.changeValueI = this.changeValueI.bind(this);
        this.confirmAdd = this.confirmAdd.bind(this);
        this.abbandon = this.abbandon.bind(this);
    }

    changeValue(newValue){
        this.dish = newValue;
        this.setState((prevState, props)=> ({changes: prevState.changes + 1}));
    }

    changeValueI(newValue){
        this.ingredient = newValue;
        this.setState((prevState, props)=> ({changes: prevState.changes + 1}));
    }

    confirmAdd(){
        this.props.editDish("", this.dish , this.ingredient);
        this.props.addDish(this.dish, this.ingredient);
        this.props.toggleAdd();

    }

    abbandon(){
        this.props.toggleAdd();
    }

    render(){
        return(
                <div id="addMenu">
                <h3>Add a new Recipe</h3>
                <div>Dish Name</div>
                <Input value={this.dish} changeValue={this.changeValue} />
                <div>Ingredients</div>
                <Input value={this.ingredient} changeValue={this.changeValueI}/>
                <div id="addRecipe" onClick={this.confirmAdd}>Add Recipe</div>
                <div id="abbandon" onClick={this.abbandon}>Abbandon Recipe</div>
                </div>
              );
    }
}





class Edit extends React.Component {
    constructor(props){
        super(props);

        this.state = {changes : 0};

        this.dish = this.props.dish;
        this.ingredient = this.props.ingredients;
        this.changeValue = this.changeValue.bind(this);
        this.changeValueI = this.changeValueI.bind(this);
        this.confirmEdit = this.confirmEdit.bind(this);
        this.abbandon = this.abbandon.bind(this);
    }

    changeValue(newValue){
        this.dish = newValue;
        this.setState((prevState, props)=> ({changes: prevState.changes + 1}));
    }

    changeValueI(newValue){
        this.ingredient = newValue;
        this.setState((prevState, props)=> ({changes: prevState.changes + 1}));
    }

    confirmEdit(){
        this.props.editDish(this.props.dish, this.dish , this.ingredient);
        this.props.addDish(this.dish, this.ingredient);
        this.props.toggleEdit();

    }

    abbandon(){
        this.props.toggleEdit();
    }

    render(){

        return(
                <div id="editMenu">
                <h3>Edit {this.props.dish}</h3>
                <Input value={this.dish} changeValue={this.changeValue} />
                <div>Ingredients</div>
                <Input value={this.ingredient} changeValue={this.changeValueI}/>
                <div id="confirmChanges" onClick={this.confirmEdit}>Confirm Changes</div>
                <div id="abbandonChanges" onClick={this.abbandon}>Abbandon Changes</div>
                </div>
              );
    }
}

class Recipe extends React.Component {
    constructor(props){
        super(props);
        this.state = {toggle: true, display: {display: "none"}, editToggle: true, editDisplay: {display: "none"}};

        this.handleToggle = this.handleToggle.bind(this);
        this.deleteDish = this.deleteDish.bind(this);
        this.toggleEdit = this.toggleEdit.bind(this);

        this.editMenu;
        this.lengthClass;
    }

    handleToggle(){
        if (this.state.toggle == true){
            this.setState({toggle: false, display: {display : "block"}});
        }
        else
            this.setState({toggle: true, display: {display : "none"}});
    }

    seperateIngredients(){
        var ingredients = this.props.ingredients.split(',');
        var displayIngredients = [];
        for (var i = 0; i < ingredients.length; i++){
            displayIngredients.push(<div>{ingredients[i]}</div>);
        }

        return(
                displayIngredients
              );
    }

    deleteDish(){
        this.props.deleteDish(this.props.dish);
    }

    toggleEdit(){
        if (this.state.editToggle == true){
            this.setState({editToggle: false, editDisplay: {display : 'block'}});
            this.editMenu = <Edit 
                dish={this.props.dish} 
            ingredients={this.props.ingredients} 
            editDish={this.props.editDish} 
            deleteDish={this.props.deleteDish}
            addDish={this.props.addDish}
            toggleEdit={this.toggleEdit}
            />;
            const newvalue = {display: 'none'};
            const newBorder = {borderBottom: 'none'}
            this.props.hideEditFunction(newvalue, newBorder);
        }
        else{
            this.setState({editToggle: true, editDisplay: {display : 'none'}}); 
            this.editMenu = "p";
            const oldvalue = {display: 'block'};
            const oldBorder = {borderBottom: "solid black"}
            this.props.hideEditFunction(oldvalue, oldBorder);
        }
    }

    lengthOfDish(){
        if (this.props.dish.length > 54){
            this.lengthClass = "veryLongDish";
        }
        else if (this.props.dish.length > 24){
            this.lengthClass = "longDish";
        }
        else{
            this.lengthClass = "dish";
        }
    }

    render(){
        this.lengthOfDish();
        return(
                <div>
                <div style={this.props.editHide}>
                <div className={this.lengthClass} onClick={this.handleToggle}><p>{this.props.dish}</p></div>
                <div className="ingredientContainer"></div>
                <div className="ingredients" style={this.state.display} >
                {this.seperateIngredients()}
                <div id="delete" onClick={this.deleteDish}>Delete</div>
                <div id="edit" onClick={this.toggleEdit}>Edit</div>
                </div>
                </div>
                <div className="editMenu" style={this.state.editDisplay} >
                {this.editMenu}
                </div>
                </div>
              );
    }

}





class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {deletes : 0,
            toggleAdd : true ,
            addDisplay : {display: "none"},
            addDisplay2 : {display: 'block'},
            editHide : {display: 'block'},
            borderBottom: {borderBottom: 'solid black'}};

        this.recipes = this.props.recipes;
        this.deleteDish = this.deleteDish.bind(this);
        this.addDish = this.addDish.bind(this);
        this.editDish = this.editDish.bind(this);
        this.openAdd = this.openAdd.bind(this);
        this.hideEditFunction = this.hideEditFunction.bind(this);

        this.recipeArray = [];
        this.addMenu;
    }

    list(){
        var recipeList = [];
        //this.recipeArray = [];

        for (var dish in this.props.recipes){

            if (this.recipeArray.indexOf(dish) == -1){
                this.recipeArray.push(dish);
                this.recipeArray.push(this.recipes[dish]);
            }
        }

        for (var l = 0; l < this.recipeArray.length; l = l + 2){
            recipeList.push(<Recipe
                    hideEditFunction={this.hideEditFunction}
                    addDish={this.addDish}
                    editDish={this.editDish}
                    dish={this.recipeArray[l]}
                    ingredients={this.recipeArray[l + 1]}
                    deleteDish={this.deleteDish}
                    editHide={this.state.editHide}
                    />);

        }

        return(recipeList);
    }

    hideEditFunction(newValue, borderValue) {
        this.setState({ editHide : newValue, borderBottom : borderValue});
    }

    addDish(dish, ingredients){

        if (dish != "" && ingredients != ""){
            if (this.recipes[dish] == undefined){
                this.recipes[dish] = ingredients;
            }
            this.setState((prevState,props) => ({deletes: prevState.deletes -1}));
        }
    }

    editDish(dish, newdish, ingredients){
        var inspectedDish = this.recipeArray.indexOf(dish);
        if (newdish == "" || ingredients == ""){
            this.recipeArray.push("Please make sure to include a dish name and ingredients");
            this.recipeArray.push("please delete this dish");
        }
        else {
            if (inspectedDish != -1){
                delete this.recipes[dish];
                this.recipeArray.splice(inspectedDish,2, newdish, ingredients);
            }
            else {
                if (this.recipeArray.indexOf(newdish) == -1){
                    this.recipeArray.push(newdish);
                    this.recipeArray.push(ingredients);
                }
                else {
                    this.recipeArray.push("Duplicate of " + newdish);
                    this.recipeArray.push("please delete this dish");
                }
            }
        }

        this.setState((prevState, props)=> ({deletes: prevState.deletes + 1}));
    }

    deleteDish(dish){
        delete this.recipes[dish];
        var inspectedDish = this.recipeArray.indexOf(dish);
        if (inspectedDish != -1){
            this.recipeArray.splice(inspectedDish,2);
        }
        this.setState((prevState, props)=> ({deletes: prevState.deletes + 1}));
    }

    openAdd(){
        if (this.state.toggleAdd == true){
            this.setState({toggleAdd : false, addDisplay: {display : 'block'}, addDisplay2: {display : 'none'}});
            this.addMenu = <AddMenu 
                dish="" 
                ingredient="" 
                editDish={this.editDish} 
            addDish={this.addDish}
            toggleAdd={this.openAdd}
            />;
        }
        else{
            this.setState({toggleAdd: true, addDisplay: {display : 'none'}, addDisplay2: {display : 'block'}}); 
            this.addMenu = "p";
        }
    }

    render(){
        //<h3>this is just a string of prop {JSON.stringify(this.props.recipes)}</h3>
        //localStorage.clear();
        localStorage.setItem("_mndowne_recipes", JSON.stringify(this.recipes));
        return(
                <div>
                <div style={this.state.addDisplay2}>
                <div style={this.state.borderBottom}>
                <div id="titleBar" style={this.state.editHide}>Recipe Box</div>
                {this.list()}
                </div>

                <div id="add" onClick={this.openAdd} style={this.state.editHide}>Add Recipe</div>
                </div>
                <div id="addMenu" style={this.state.addDisplay}>
                {this.addMenu}
                </div>
                </div>
              );
    }
}

const startRecipes = {Pasta : "redSauce,pasta,garlic",Oatmeal: "Oats,Bananas",SpinachBeanPotato: "Spinich,Garbanzo Beans,Sweet Potatos"};

if(localStorage.getItem("_mndowne_recipes") == undefined){
    ReactDOM.render(<App recipes={startRecipes}/>, apptag);
}
else
ReactDOM.render(<App recipes={JSON.parse(localStorage.getItem("_mndowne_recipes"))} />, apptag);

