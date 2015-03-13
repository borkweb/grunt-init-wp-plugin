<?php

class {%= class_name %} {
	private $admin;

	/**
	 * constructor
	 */
	public function __construct() {
	}//end __construct

	/**
	 * admin object accessor method
	 */
	public function admin() {
		if ( ! $this->admin ) {
			require_once __DIR__ . '/class-{%= name %}-admin.php';

			$this->admin = new {%= class_name %}_Admin();
		}//end if

		return $this->admin;
	}//end admin
}//end class

/**
 * singleton function
 */
function {%= singleton %}() {
	global ${%= singleton %};

	if ( ! ${%= singleton %} ) {
		${%= singleton %} = new {%= class_name %};
	}//end if

	return ${%= singleton %};
}//end {%= singleton %}
