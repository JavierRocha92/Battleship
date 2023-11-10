const checkScore = (winner) => {
    if(winner === 'machine' && enemyShootsOnTarget === 17){
        console.log('la maquina ha gansdp')
    }else{
        if(playerShootsOnTarget === 17){
            console.log('el juegador ha ganado')
        }
    }
}