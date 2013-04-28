<?php
	function get_ext($path) {
		$path_info = pathinfo($path);
		return $path_info["extension"]; 
	}
	function get_contents($dir, $top_level = false) {
		$search_base = $_SERVER["DOCUMENT_ROOT"] . $dir;
		$ls = array_merge(
			glob($search_base . "*", GLOB_ONLYDIR),
			glob($search_base . "*.mp4", GLOB_NOSORT),
			glob($search_base . "*.m4v", GLOB_NOSORT)
		);
		if ($top_level) {
			echo "<ul>";
		} else {
			echo "<ul style='display: none;'>";
		}
		foreach ($ls as $item) {
			$name = basename($item);
			$web_path = $dir . $name;
			echo "<li>"; 
			if (filetype($item) === "file") {
				$class = get_ext($item);
				echo "<img width='30' height='1' src='/dev/media_lister/images/s.gif' /><a class='$class' href='$web_path'>$name</a>";
			} else {
				echo "<img class='dir' src='/dev/media_lister/images/arrow_r.png' />";
				echo "<a href='$web_path'>$name</a>";
				get_contents($web_path . "/");
			}
			echo "</li>";
		}
		echo "</ul>";
	}
	function build_directory_links() {
		global $current_dir;
		$string = "/"; $output_arr = array();
		$path = explode("/", $_SERVER["SCRIPT_NAME"]);
		array_pop($path); array_shift($path);
		foreach ($path as $dir) {
			$string .= $dir . "/";
			$output_arr[] = "<a href='$string'>$dir</a>";
		}
		$current_dir = array_pop($path);
		return implode("&nbsp;&nbsp;<span>&gt;</span>&nbsp;&nbsp;", $output_arr);
	}
	$current_dir = "";
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
			img.dir { padding: 0 10px; cursor: pointer; }
			span { color: #f00; }
			a { text-decoration: none; color: #fff; }
			a:hover { text-decoration: underline; }
			a:visited { color: #fff; }
			a.mp4:visited, a.m4v:visited { color: #888; }
		</style>
	</head>
	<body>
		<?php
			echo $directory_links . "<hr />";
			get_contents(dirname($_SERVER["SCRIPT_NAME"]) . "/", true);
		?>
		<script src="/tv/jQuery.js"></script>
		<script>
			(function () {
				function mod_src(o, n, that) {
					that.setAttribute("src", that.getAttribute("src").replace(o, n));
				}
				$(document.body).on("click", "img.dir", function () {
					var $_this = $(this),
						$_sib_ul = $_this.siblings("ul");
					if ($_sib_ul.is(":visible")) {
						$_sib_ul.hide();
						mod_src("_d", "_r", this);
					} else {
						$_sib_ul.show();
						mod_src("_r", "_d", this);
					}
				});
			}());
		</script>
	</body>
</html>
