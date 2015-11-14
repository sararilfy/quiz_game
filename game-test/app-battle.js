$(function(){

    // ★★★★★★★★★★ ここから定数（★ゲーム設定はここ！！★）★★★★★★★★★
    var $myDamage = 20, // 自分の毎度Damage
        $enemyDamage = 20, // 敵の毎度Damage
        $damageTime = 500, // 毎度自分Damage時間（ミリ秒）
        $myHitPoint = 100, // 初期自分のHPを入れる変数
        $enemyHitPoint = 100, // 初期敵のHPを入れる変数
        // ★★★★★★★★★★★★★★ 定数ここまで ★★★★★★★★★★★★★★★★
        $enemy = $('#enemy'), // 敵キャラ
        $my = $('#my'), // 自分キャラ
        $enemyAttacked = $('#enemy_attacked'), // 敵が受ける攻撃エフェクト
        $myAttacked = $('#my_attacked'), // 自分が受ける攻撃エフェクト
        $view_answer_maru = $('#view_answer_maru'), // ◯を表示
        $view_answer_batsu = $('#view_answer_batsu'), // ✕を表示
        $enemy_meter = $('#enemy_meter'), // 敵のHPメーター
        $my_meter = $('#my_meter'); // 自分のHPメーター

    // メーターにHPを設定
    $enemy_meter.attr({'value': $enemyHitPoint,
                       'max': $enemyHitPoint
                      });
    $my_meter.attr({'value': $myHitPoint,
                    'max': $myHitPoint
                   });
    $enemy_meter.text($enemyHitPoint);
    $my_meter.text($myHitPoint);
    // 自分のダメージ処理
    function damageMy(){
        // 自分にアタックじるしを表示
        $myAttacked.css('display', 'block');
        setTimeout(function(){
            $myAttacked.css('display', 'none');
        },1000);
        // HPを減らす
        $myHitPoint = $myHitPoint - $myDamage;
        // メーターも減る
        $my_meter.attr( 'value', $myHitPoint ).html( $myHitPoint );
        // HPが0以下ならばたんきゅー
        if ( $myHitPoint <= 0 ){
            clearInterval(damager);
            //$("#bgm").get(0).pause();
            //$("#lose").get(0).play();
            $my.attr('src', 'image/my-batsu.svg');
            $('#judgment_my').html('<span class="batanq">ばたんきゅー</span>');
            $('#judgment_enemy').html('<span class="yatta">やった！</span>');
        }
    }

    // 敵のダメージ処理（つまり正解）
    function damageEnemy(){
        $view_answer_maru.css('display', 'block'); // ◯を表示
          setTimeout(function(){
            $view_answer_maru.css('display', 'none');
          },1000);
        // 敵にアタックじるしを表示
        $enemyAttacked.css('display', 'block');
        setTimeout(function(){
            $enemyAttacked.css('display', 'none');
        },1000);
        // HPを減らす
        $enemyHitPoint = $enemyHitPoint - $enemyDamage;
        // メーターも減る
        $enemy_meter.attr( 'value', $enemyHitPoint ).html( $enemyHitPoint );
        // HPが0以下ならばたんきゅー
        if ( $enemyHitPoint <= 0 ){
            clearInterval(damager);
            //$("#bgm").get(0).pause();
            //$("#win").get(0).play();
            $enemy.attr('src', 'image/enemy-batsu.svg');
            $('#judgment_enemy').html('<span class="batanq">ばたんきゅー</span>');
            $('#judgment_my').html('<span class="yatta">やった！</span>');
        }
    }
        // 何も起きない不正解
        function noDamageEnemy(){
           $view_answer_batsu.css('display', 'block'); // ✕を表示
           setTimeout(function(){
             $view_answer_batsu.css('display', 'none');
           },1000);
        }

    // startを押すと、ダメージ処理始まる
    $('#start').on('click', function(){
        //$("#bgm").get(0).play();
        damager = setInterval( damageMy, 3000 );
    });

});
