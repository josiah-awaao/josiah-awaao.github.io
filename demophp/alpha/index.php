<!DOCTYPE html>

<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="./css/style.css" type="text/css">
	<script src="functions.js" type="application/javascript"></script>
	<script>
		session_id = "<?php echo session_id(); ?>";
	</script>

	<title>Register</title>
	<style type="text/css">

	</style>
</head>

<body style="height:100%; background:none transparent;">
	<div class="container" style="max-width:610px; padding-top:50px">
		<!-- Select user -->
		<div id="step_start" class="step" style="display:inline; opacity: 1">
			<p><h4>What do you want to do?</h4></p>
			<div>
				<a class="btn btn-colors" onclick="enrollStart();" role="button"><b>Enroll new user</b></a>
				<a class="btn btn-colors" onclick="verifyStart();" role="button"><b>Verify existing user</b></a>
			</div>
		</div>

		<!-- Enroll - Enter username -->
		<!-- this step is only for demo, in normal situations an app will assign an internal user id to the user, and you would have already recorded the information about the user, so this step would be hidden, however you should ask and explicitly obtain the agreement to record and use the user's typing pattern -->
		<div id="step_learn" class="step">
			<p>
				<h4>Enter a username to enroll</h4></p>
			<div class="input-group" style="max-width:550px;">
				<span class="input-group-addon">Your username</span>
				<input type="text" id="usernameEnroll" class="form-control" placeholder="">
			</div>
			<div style="padding-top: 20px">
				<p>
					<label class="checkbox-inline">
						<input type="checkbox" id="iagree" value=""><small>I agree with the <a href="#">terms</a> including that this website will record and use my typing pattern.</small></label>
				</p>
			</div>
			<div style="padding-top: 6px"><a class="btn btn-colors" onclick="nextFunction();" role="button"><b>I agree, let's proceed!</b></a></div>
		</div>

		<!-- Verify - Enter username -->
		<!-- this step is only for demo, in normal situations an app will assign an internal user id to the user, and you would have already recorded the information about the user, so this step would be hidden, however you should ask and explicitly obtain the agreement to record and use the user's typing pattern -->
		<div id="step_verify" class="step">
			<p>
				<h4>Enter a username to verify</h4></p>
			<div class="input-group" style="max-width:550px;">
				<span class="input-group-addon">Your username</span>
				<input type="text" id="usernameVerify" class="form-control" placeholder="">
			</div>
			<div style="padding-top: 20px"><a class="btn btn-colors" onclick="nextFunction();" role="button"><b>Next</b></a></div>
		</div>

		<!-- Loading -->
		<div id="step_loading" class="step">
			<br />
			<p>Loading...</p>
		</div>
	</div>

	<script>
		var username = ''; /** a variable where to store the user name */
		var nextFunction; /** a proxy for the next function in chain */

		/*****************************************************
		 * called after selecting the enroll new user option
		 *****************************************************/
		function enrollStart() {
			swapContent('step_start', 'step_learn', function() {
				try{
					document.getElementById('usernameEnroll').focus();
				}catch (e) {
					console.error(e);
				}
				nextFunction = enrollNext;
			});
		}

		/*****************************************************
		 * called after selecting the verify user option
		 *****************************************************/
		function verifyStart() {
			swapContent('step_start', 'step_verify', function() {
				try{
					document.getElementById('usernameVerify').focus();
				}catch (e) {
					console.error(e);
				}
				nextFunction = verifyNext;
				//initControls(nextFunction);
			});
		}

		function enrollNext() {
			var usernameEnroll = document.getElementById('usernameEnroll');
			if (usernameEnroll && usernameEnroll.value.length > 5) {
				if (document.getElementById('iagree').checked === true) {
					document.location = 'register.php?user=' + usernameEnroll.value;
				} else {
					alert('You have to agree to our terms');
				}
			} else {
				alert('Your username/id should be at least 6 characters in length');
			}
		}


		function verifyNext() {
			var usernameVerify = document.getElementById("usernameVerify");
			if (usernameVerify && usernameVerify.value.length > 5) {
				swapContent('step_verify', 'step_loading');
				var params = {
					username: usernameVerify.value,
					step:'checkuser',
					session_id: session_id
				}
				ajaxCall(params, function(result) {
					if(result && result.result > 0) {
						document.location = 'verify.php?user=' + usernameVerify.value;
					}else{
						swapContent('step_loading', 'step_start');
						alert('Username not found.');
					}
				});
			} else {
				alert('Your username/id should be at least 6 characters in length');
			}
		}

		mobileAndTabletCheck(function(result){
			if (result == true) {
				swapContent('step_start', 'mobile', function() {
					console.error('no mobile support yet.');
					nextFunction = null;
				});
			}
		});
		/** checks if Enter is pressed on text forms and calls the next function*/
		initControls();
	</script>
</body>

</html>
