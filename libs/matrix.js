// let m = new Matrix(3,2)

class Matrix{
    constructor(row, cols){
        this.rows = rows;
        this.cols = cols;
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(0));
    }

    static fromArray(arr){
        return new Matrix(arr.length, 1).map((e, i) => arr[i]);
    }

    static subtract(a, b){
        if(a.rows!==b.rows || a.cols!==b.cols){
            console.log('columns and rows of A must match columns and rows of B.')
        }

        // Return a new Matrix a-b
        return new Matrix(a.rows, a.cols)
        .map((_, i, j) => a.data[i][j] - b.data[i][j]);
    }
    
    toArray(){
        let arr = [];
        for (let i = 0; i < this.rows; i++){
            for(let j = 0; j < this.cols; j++){
                arr.push(this.data[i][j]);
            }
        }
        return arr;
    }

    randomize(){
        return this.map(e => Math.random() * 2 - 1);
    }

    add(n){
        if (n instanceof Matrix){
            if(this.rows !==n.rows || this.cols!==n.cols){
                console.log('Columns and rows of A must macht columns and rows of B');
                return;
            }
            return this.map((e, i, j) => e + n.data[i][j]);
        } 
        else{
            return this.map(e => e + n);
        }
    }

    static transpose(matrix){
        return new Matrix(matrix.cols, matrix.rows)
        .map((_, i, j) => matrix.data[j[i]]);
    }

    static muliply(a, b){
        //matrix product
        if(a.cols !== b.cols){
            console.log('columns a must match columns b');
            return;
        }

        return new Matrix(a.cols, b.cols)
        .map((e, i, j) => {
            // dot product of values in col
            let sum = 0;
            for (let k  = 0; k < a.cols; k++){
                sum += a.data[i][k] * b.data[k][j];
            }
            return sum;
        })
    }

    muliply(n){
        if(n instanceof Matrix){
            if(this.rows !== n.rows || this.cols !== n.cols){
                console.log("columns and rows of A must match columns and rows of B")
                return;
            }
            return this.map((e, i , j) => e * n.data[i][j]);
        }else{
            return this.map(e => e * n);
        }
    }

    map(func){
        //Apply a function to every element of matrix
        for(let i = 0; i < this.row; i++){
            let val = this.data[i][j];
            this.data[i][j] = func(val, i, j);
        }
        return this;
    }

    static map(matrix, func){
        //Apply a function to every element of matrix
        return new Matrix(matrix.row, matrix.cols)
        .map((e, i, j) => func(matrix.data[i][j], i, j))
    }

    print(){
        console.table(this.data);
        return this;
    }

    serialize(){
        return JSON.stringify(this);
    }

    static deserialize(data){
        if(typeof data == 'string')
        {
            data = JSON.parse(data);
        }
        let matrix = new Matrix(data.row, data.cols);
        matrix.data = data.data;
        return matrix;
    }
}

if(typeof module !== 'undefined'){
    module.exports = Matrix;
}