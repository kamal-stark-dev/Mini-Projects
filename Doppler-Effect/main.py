from pyray import *
from raylib import *

WIDTH = 1200
HEIGHT = 800

init_window(WIDTH, HEIGHT, "Doppler Effect")

set_target_fps(60)

player_pos = Vector2(WIDTH // 2, HEIGHT // 2)
player_radius = 70
player_color = RAYWHITE
player_speed = 5

WAVES_COUNT = 3

def draw_waves(spacing):
    for i in range(1, WAVES_COUNT + 1):
        draw_circle_lines_v(player_pos, player_radius + (i * 20) + spacing, player_color)

spacing = 0
while not window_should_close():

    # player movement
    if (is_key_down(KEY_RIGHT) or is_key_down(KEY_D)) and player_pos.x < WIDTH + player_radius - 10:
        player_pos.x += player_speed
    if (is_key_down(KEY_LEFT) or is_key_down(KEY_A)) and player_pos.x > -player_radius + 10:
        player_pos.x -= player_speed
    if (is_key_down(KEY_UP) or is_key_down(KEY_W)) and player_pos.y > -player_radius + 10:
        player_pos.y -= player_speed
    if (is_key_down(KEY_DOWN) or is_key_down(KEY_D)) and player_pos.y < HEIGHT + player_radius - 10:
        player_pos.y += player_speed

    begin_drawing()

    clear_background(BLACK)

    draw_circle_v(player_pos, player_radius, player_color)
    # dt = get_frame_time()
    spacing += 2
    draw_waves(spacing)

    end_drawing()

close_window()