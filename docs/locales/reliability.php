<?php

defined('IN_CODE') or die('This script can not be run by itself.');

/**
 * @package Base
 * @subpackage Static
 */

global $User;

$unballancedCDs = $User->gamesLeft - $User->CDtakeover;
$unballancedNMR = $User->missedMoves - ($User->CDtakeover * 2);
if ( $unballancedCDs < 0 )
{
	$unballancedNMR = $User->missedMoves + ($unballancedCDs * 2);
	$unballancedCDs = 0;
}

if ($User->phasesPlayed < 100 && libReliability::integrityRating($User) > -1) {
?>
	<p class="intro">
	New members of this site have some light restrictions on how many games they can join or create at once.
	You need to play at least <strong>20 phases</strong>, before you can join more than 2 games, 
	<strong>50 phases</strong>, before you can join more than 4 games and at least <strong>100 phases</strong>,
	before you can join more than 7 games at once. 2-player variants are not affected by this restriction.
	</p>
	
	<p class="intro">
	You can see your total phases played and more useful information in the reliability section of 
	<a href="profile.php?userID=<?php print $User->id; ?>">your stats page</a>.</p>

	<p class="intro">
	The restrictions are in place to ensure all new members do not jump into more games then they can handle.
	Diplomacy games can take up a lot of time so please test out several games before committing to multiple.
	</p>

	<p class="intro">
	PLEASE NOTE: If you fail to submit orders for your country in consecutive turns (usually 2) the country is
	sent into "Civil disorder" which allows any site member to take over your position to ensure that the game's
	integrity is not negatively impacted.
	</p>

	<p class="intro">
	If you have missed turns in your games, or if your countries fell into CD then you will be restricted in the
	number of games you can play regardless of how many phases you have completed. This is to ensure that all players
	take care not to take on more games then they can keep up with, and to ensure that players who do not respect their
	fellow members are not given the chance to ruin multiple games.
	</p>
<?php
} else {
	if (libReliability::integrityRating($User) <= -1)
		print '<p class="intro">
			Your ability to join or create a new game is limited, because you seem to be having 
			trouble keeping up with the orders in the ones you already have.
			</p>';
?>
	<p class="intro">
	On this site we ask that all players respect their fellow players. Part of this respect includes
	entering orders every turn in your games. Diplomacy is a game of communication, trust (and mistrust),
	and because games usually take a long time to finish it's very important that you play the best you can
	and don't ruin the game halfway. 
	</p>

	<p class="intro">
	While playing a losing position might not be as fun as a winning one, it is still your responsibility to
	other members to continue to play. Even if you cannot win a game there are still plenty of ways to make the
	game fun. For example: you may choose to hurt the country that sealed your defeat, help someone secure a solo
	so that you can get a survive instead of a defeat, or use the rest of the game to practice manipulating other
	players on the board.
	</p>

	<p class="intro">
	If you fail to submit orders for your country in consecutive turns (usually 2) the country is sent into "Civil disorder"
	and another player can take over your position to ensure that the game's integrity is not overly impacted.
	</p>

	<p class="intro">
	If you have missed turns in your games or your countries went in CD then you will be limited in the number of games 
	you can play. This is to ensure that players do not take on more games then they can keep up with, and to ensure that players who
	do not respect their fellow members cannot ruin multiple games. 
	</p>

	<?php
	if (libReliability::integrityRating($User) <= -1)
	{
			print '<p class="intro">To calculate how many games you can join we use your CD-takeovers and subtract your missed moves * 0.2 and your CDs * 0.6
			(as 1 CD most of the time has 2 missed moves before).</p>
			
			<p class="intro">Using your current stats we get:
			<ul><li>CD-takeover = '.$User->CDtakeover.'</li>
			<li>NMRs = '.$User->missedMoves.'</li>
			<li>CDs = '.$User->gamesLeft.'</li></ul></p>
			<p class="intro">
			Your final score is: <b>'.$User->CDtakeover.'</b> - (<b>'.$User->missedMoves.'</b> * 0.2 + <b>'.$User->gamesLeft.'</b> * 0.6) = <b>'.($User->CDtakeover - ( $User->missedMoves * 0.2 + $User->gamesLeft * 0.6)).
			'</b><br>
			<p class="intro">Based on this results the following restrictions are in effect:
			<ul><li>greater than -1 => no restrictions</li>
			<li>between -1 and -2 => max 6 games</li>
			<li>between -2 and -3 => max 5 games</li>
			<li>between -3 and -4 => max 3 games</li>
			<li>and lower than -4 => max 1 game </li>
			</ul></p>
			
			<p class="intro">If you want to to increase the number of games you can join you may take over 
			<a href="gamelistings.php?page-games=1&gamelistType=Joinable">open spots in ongoing games</a> or reclaim your CDed
			countries if they have not been taken. Every country taken does improve your score by <b>1</b></p>';
			
	}
}
?>
