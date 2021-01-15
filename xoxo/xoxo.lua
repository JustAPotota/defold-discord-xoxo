local M = {}


local on_request_opponent_fn
function M.on_request_opponent(fn)
	on_request_opponent_fn = fn
end
function M.request_opponent(callback)
	on_request_opponent_fn(callback)
end


local on_request_game_state_fn
function M.on_request_game_state(fn)
	on_request_game_state_fn = fn
end
function M.request_game_state(callback)
	on_request_game_state_fn(callback)
end


local on_send_player_move_fn
function M.on_send_player_move(fn)
	on_send_player_move_fn = fn
end
function M.send_player_move(row, column, callback)
	on_send_player_move_fn(row, column, callback)
end


local on_request_rematch_fn
function M.on_request_rematch(fn)
	on_request_rematch_fn = fn
end
function M.request_rematch(callback)
	on_request_rematch_fn(callback)
end


return M