class AlimentoController{
    constructor(scope, alimentoService, usuarioService){        
        this._scope = scope;
        this._alimentoService = alimentoService;
        this._usuarioService = usuarioService;
        var alimento = {nome: "uva", tipo: "Proteina", validade: new Date("2019-06-30"), localizacao: "Avenida Clara Nunes, 54 Oswaldo Cruz - Rio de Janeiro"};
        this._scope.alimentos = [];
        this._scope.alimentos.push(alimento);
        localStorage.setItem("alimentos", JSON.stringify(this._scope.alimentos));
        //this._alertaVisual = alertaVisual
        this._registrarMetodos();
        //this._scope.viewState = this._scope.state.current.name;

        /*if(this._scope.viewState == "colaboradores.editar" || this._scope.viewState == "colaboradores.visualizar")
            this._scope.buscar(scope.state.params.id);*/        
    }

    listar(){
        this._scope.alimentos = this._alimentoService.listar();
    }

    distanciar(){        
        this._alimentoService.distanciar(this._scope.alimentos);
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
        this._scope.excluir = angular.bind(this,this.excluir);
    }
}

AlimentoController.$inject = ['$scope','alimentoService', 'usuarioService'];

angular.module('desafioaurorati')
        .controller('AlimentoController', AlimentoController);