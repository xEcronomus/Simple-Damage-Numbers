const Command = require('command');

module.exports = function simplified (dispatch) {
	let gameId = null;
	const command = Command(dispatch);

	var bCounting = false;
	dispatch.hook('S_LOGIN', 9, event => { 
		gameId = event.gameId;
	});
	dispatch.hook('S_EACH_SKILL_RESULT', dispatch.base.majorPatchVersion < 74 ? 10 : 12, { order: 200 }, (event) => {
		if ((event.source.equals(gameId) || event.owner.equals(gameId)) && event.type==1 ) {
				var damage = (event.damage/1000);
                if(damage>999 && event.crit){
                    event.damage = damage;
                    return true;
                }
                return false;
			}
    });

}
