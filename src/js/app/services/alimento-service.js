class AlimentoService{
    constructor(http,usuarioService){
        this._proximoId = 1;
        this._http = http;
	this._usuarioService = usuarioService;
        localStorage.setItem("alimentos", JSON.stringify(new Array()));        
        this._alimentos = [];
    }

    listar(){
        return JSON.parse(localStorage.getItem("alimentos"));
    }

    distanciar(scope){
       var alimentos = JSON.parse(localStorage.getItem("alimentos"));;
       var usuario = this._usuarioService.obterLocalizacao();
       
       var service = new google.maps.DistanceMatrixService();
       
    
       alimentos.forEach(function(alimento, index){
            if(alimento.distancia == null){

            service.getDistanceMatrix({
                origins: [usuario.localizacao],
                destinations: [alimento.localizacao],
                travelMode: google.maps.TravelMode.DRIVING
                }, 
                function(response, status){
                    if (status == google.maps.DistanceMatrixStatus.OK){
                        //console.log(response.rows[0].elements[0])
                        //alimento.distancia = response.rows[0].elements[0].distance.value;
                        console.log(scope);
                        alimentos[index].distancia = {};
                        alimentos[index].distancia.valor = response.rows[0].elements[0].distance.value;
			alimentos[index].distancia.texto = response.rows[0].elements[0].distance.text;
                        console.log("A distancia para o endereco é de " + response.rows[0].elements[0].distance.text);
                   	localStorage.setItem("alimentos", JSON.stringify(alimentos));         
                        this._alimentos.push(alimentos[index]);
                        scope.alimentos = this._alimentos;
                        //alimentosNaView.push(alimentos[x]);
                        //alert("Distância:" + response.rows[0].elements[0].distance.text)
                        //alert("Duração:" + response.rows[0].elements[0].duration.text);d
                    }
                }
            );   

	    } 
	});
    }

    buscarPeloId(id){
        var alimentos = JSON.parse(localStorage.getItem("alimentos")).filter(function(alimento){
            if(alimento.id == id)
                return alimento;                         
        })[0];
    }

    salvar(alimento){
        var alimentos = JSON.parse(localStorage.getItem("alimentos"));
        
        if(alimento.id == null){
            alimento.id = this._proximoId;
            alimentos.push(alimento);            
            
            this._proximoId++;
            localStorage.setItem("alimentos", JSON.stringify(alimentos));
        }
        else{
            var alimentos = JSON.parse(localStorage.getItem("alimentos")).filter(function(corrente){
                if(alimento.id == corrente.id)
                    corrente = alimento;
                return corrente;                
            });
            localStorage.setItem("alimentos", JSON.stringify(alimentos));
        }
    }

    excluir(id){
        var alimentos = JSON.parse(localStorage.getItem("alimentos")).filter(function(alimento){
            if(alimento.id != id)
                return alimento;
        });
        var conversao = JSON.stringify(alimentos);
        localStorage.setItem("alimentos", alimentos);
    }
}

AlimentoService.$inject = ['$http', 'usuarioService'];

angular.module('desafioaurorati')
        .service('alimentoService', AlimentoService);
