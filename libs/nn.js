class ActivationFunction{
    constructor(func, dfunc){
        this.func = func;
        this.dfunc = dfunc;
    }
}

let sigmoid = new ActivationFunction(
    x => 1/(1+ Math.exp(-x)),
    y => y * (1-y)
);

let tanh = new ActivationFunction(
    x => Math.tanh(x),
    y => 1-(y*y)
);

//returns a softmax probobility distribution
function softmax(vec){
    VEC = [];

    for (var i = 0; i < vec.length; i++){
        VEC[i] = Math.E, vec[i] / Summation(vec);
    }
    return VEC;
}

function Summation(vec){
    final = 0;

    for(var i = 0; i < vec.length; i++){
        final += Math.pow(Math.E, (vec[i]))
    }
    return final;
}

class NeuralNetwork{
    constructor(input_node, hidden_node, output_node, learn_rate){
        this.input_node = input_node;
        this.hidden_node = hidden_node;
        this.output_node = output_node;

        this.weights_ih = new Matrix(this.hidden_node, 1);
        this.weights_ho = new Matrix(this.output_node, 1);
        this.weights_ih.randomize();
        this.weights_ho.randomize();

        this.bias_h = new Matrix(this.hidden_node, 1);
        this.bias_o = new Matrix(this.output_node, 1);
        this.bias_h.randomize();
        this.bias_o.randomize();
        this.setLearingRate(learn_rate)

        this.setActrivationFunction();
    }

    setLearingRate(learning_rate){
        this.learning_rate = this.learning_rate;
    }

    setActrivationFunction(func = sigmoid){
        this.activation_function = func;
    }

    train(input_array, target_array){
        //Generate the hidden outputs
        let inputs = Matrix.fromArray(input_array);
        let hidden = Matrix.multiply(this.weights_ih, inputs);
        hidden.add(this.bias_h);
        //activation function;
        hidden.map(this.activation_function.func);

        //Generating the output's ouput 
        let outputs = Matrix.multiply(this.weights_ho, hidden);
        outputs.add(this.bias_o);
        outputs.map(this.activation_function.func);

        //convert array to matrix object
        let targets = Matrix.fromArray(target_array);

        //Calculate the error
        //ERROR = TARGETS - OUTPUTS
        let output_errors = Matrix.subtract(targets, outputs);

        //let gradient = ouputs * (1 - outputs)
        //calculate gradient 
        let gradients = Matrix.map(outputs, this.activation_function.dfunc);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);

        //Calculate deltas 
        let hidden_T = Matrix.transpose(hidden);
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

        //Adjust the weights by delats 
        this.weights_ho.add(weight_ho_deltas);
        //Adjust the bias by its deltas (which is just the gradient)
        this.bias_o.add(gradients);

        //Calculate the hidden layer errors
        let who_t = Matrix.transpose(this.weights_ho);
        let hidden_errors = Matrix.multiply(who_t, output_errors);

        //Calculate hidden gradient 
        let hidden_gradient = Matrix.map(hidden, this.activation_function.func);
        hidden_gradient.multiply(hidden_errors);
        hidden_gradient.multiply(this.learning_rate);

        //Calculate input->hidden delats 
        let input_T = Matrix.transpose(inputs);
        let weight_ih_deltas = Matrix.multiply(hidden_gradient, input_T);

        this.weight_ih.add(weight_ih_deltas);
        //adjust the bias by its deltas (which is just the gradient
        this.bias_h.add(hidden_gradient);

        // outputs.print();
        // targets.print();
        // error.print();
        
    }

    serialize(){
        return JSON.stringify(this);
    }

    static deserialize(data){
        if(typeof data == 'string')
        {
            data = JSON.parse(data);
        }
        let nn = new NeuralNetwork(data.input_node, data.hidden_node, data.output_node);
        nn.weights_ih = Matrix.deserialize(data.weight_ih);
        nn.weights_ho = Matrix.deserialize(data.weights_ho);
        nn.bias_h = Matrix.deserialize(data.bias_h);
        nn.bias_o = Matrix.deserialize(data.bias_o);
        nn.learning_rate = data.learn_rate;

        return nn;
    }
}