<?php
	function get_ext($path) {
		$path_info = pathinfo($path);
		return $path_info['extension']; 
	}
	function get_contents($dir, $top_level = false) {
		$ls = scandir($_SERVER['DOCUMENT_ROOT'] . $dir);
		if ($top_level) {
			echo '<ul>';
		} else {
			echo '<ul style="display: none;">';
		}
		for ($i = 2, $max = count($ls); $i < $max; $i += 1) {
			$echo = false;
			$name = $ls[$i];
			$web_path = $dir . $name;
			$abs_path = $_SERVER['DOCUMENT_ROOT'] . $web_path;
			if (filetype($abs_path) === 'file') {
				$class = get_ext($abs_path);
			} else {
				$class = 'dir';
			}
			if ($class === 'dir' || $class === 'mp4' || $class === 'm4v') {
				$echo = true;
				echo '<li>'; 
				if ($class === 'dir') {
					echo '<a class="dir" href="' . $web_path . '"><img src="/dev/media_lister/images/arrow_r.png" /></a>';
					echo '<a href="' . $web_path . '">' . $name . '</a>';
				} else {
					echo '<img width="30" height="1" src="/dev/media_lister/images/s.gif" /><a class="' . $class . '" href="' . $web_path . '">' . $name . '</a>';
				}
			}
			if ($class === 'dir') {
				get_contents($web_path . '/');
			} elseif ($echo) {
				echo '</li>';
			}
		}
		echo '</ul>';
	}
	function build_directory_links() {
		global $current_dir;
		$string = '/'; $output_arr = array();
		$path = explode('/', $_SERVER['SCRIPT_NAME']);
		array_shift($path); array_pop($path);
		foreach ($path as $dir) {
			$string .= $dir . '/';
			$output_arr[] = '<a href="' . $string . '">' . $dir . '</a>';
		}
		$current_dir = array_pop($path);
		return implode('&nbsp;&nbsp;<span>&gt;</span>&nbsp;&nbsp;', $output_arr);
	}
	$current_dir = '';
	$directory_links = build_directory_links(); 
?>
<!DOCTYPE html>
<html>
	<head>
		<title><?=$current_dir?></title>
		<meta charset="utf-8" />
		<style>
			body { font-family: Helvetica, sans-serif; line-height: 1.7em; background-color: #333; color: #fff;}
			ul {padding-left: 10px;}
			li { list-style-type: none; }
			a img { padding: 0 10px; }
			span { color: #f00; }
			a { text-decoration: none; color: #fff; }
			a:hover { text-decoration: underline; }
			a:visited { color: #fff; }
			a.mp4:visited, a.m4v:visited { color: #888; }
		</style>
	</head>
	<body>
		<?php
			echo $directory_links . '<hr />';
			get_contents(dirname($_SERVER['SCRIPT_NAME']) . '/', true);
		?>
		<script src="jQuery.js"></script>
		<script>
			(function () {
				function mod_src(o, n, that) {
					that.setAttribute('src', that.getAttribute('src').replace(o, n));
				}
				$(document.body).on('click', 'a.dir', function () {
					var $_this = $(this),
						arrow = $_this.children()[0],
						$_sib_ul = $_this.siblings('ul');
					if ($_sib_ul.children().length) {
						if ($_sib_ul.is(':visible')) {
							$_sib_ul.hide();
							mod_src('_d', '_r', arrow);
						} else {
							$_sib_ul.show();
							mod_src('_r', '_d', arrow);
						}
						return false;
					}
				});
			}());
		</script>
	</body>
</html>
