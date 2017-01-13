class AlimentoController{
    constructor(scope, alimentoService){        
        this._scope = scope;
        this._alimentoService = alimentoService;
        this._registrarMetodos();
    }

    listar(){
        this._scope.alimentos = this._alimentoService.listar();
    }

    distanciar(){
	var alimentos = this._alimentoService.distanciar(this._scope);
    }
  
    alarme(){
	console.log("oi");
    }	

    buscarPeloId(){

    }

    salvar(){
        var testaData = this._scope.validade.ano+"-"+this._scope.validade.mes+"-"+this._scope.validade.dia;
        
        if(new Date(testaData) < new Date())
            alert("A data informada é menor que a data corrente");
        else{
            this._scope.alimento.validade = testaData;
            this._alimentoService.salvar(this._scope.alimento);
            this._scope.state.go("alimentos");
        }
    }

    excluir(){

    }    
    
    _registrarMetodos(){
        this._scope.listar = angular.bind(this,this.listar);
        this._scope.distanciar = angular.bind(this,this.distanciar);
        this._scope.buscarPeloId = angular.bind(this,this.buscarPeloId);        
        this._scope.salvar = angular.bind(this,this.salvar);
    }
}

AlimentoController.$inject = ['$scope','alimentoService'];

angular.module('desafioaurorati')
        .controller('AlimentoController', AlimentoController);
