package ec.com.tas.evaluacionfinal;

import android.os.Bundle;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import layout.actividades;

public class MainActivity extends AppCompatActivity
        implements NavigationView.OnNavigationItemSelectedListener {

    NavigationView navigationView = null;
    Toolbar toolbar = null;

    //variables generales del programa, se deberán castear cada uno de los objetos para
    //utilizarlos
    private static TextView setUsuario;
    private static TextView setEmail;
    private static EditText usuario;
    private static EditText email;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //monto el primer layout en en activity
        layout.home fragment = new layout.home();
        android.support.v4.app.FragmentTransaction fragmentTransaction =
                getSupportFragmentManager().beginTransaction();
        fragmentTransaction.replace(R.id.fragment_container, fragment);
        fragmentTransaction.commit();

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);


        //por ahora no se requiere de boton flotante, de necesitarlo descomentar las siguientes líneas de código
        //y también habilitarlo en app_bar_main.xml
        /*
        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Snackbar.make(view, "Replace with your own action", Snackbar.LENGTH_LONG)
                        .setAction("Action", null).show();
            }
        });
        */

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        ActionBarDrawerToggle toggle = new ActionBarDrawerToggle(
                this, drawer, toolbar, R.string.navigation_drawer_open, R.string.navigation_drawer_close);
        drawer.setDrawerListener(toggle);
        toggle.syncState();

        NavigationView navigationView = (NavigationView) findViewById(R.id.nav_view);
        navigationView.setNavigationItemSelectedListener(this);
    }

    //boton para cerrar el cajón
    @Override
    public void onBackPressed() {
        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        if (drawer.isDrawerOpen(GravityCompat.START)) {
            drawer.closeDrawer(GravityCompat.START);
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        // Inflate the menu; this adds items to the action bar if it is present.
        getMenuInflater().inflate(R.menu.main, menu);
        return true;
    }

    //este metodo sirve para manejar los botones del menu superior derecho, por ahora se encuentran las opciones
    //about, logout y exit.
    @Override
    public boolean onOptionsItemSelected(MenuItem item) {

        int id = item.getItemId();

        if (id == R.id.about) {
            Toast.makeText(getApplicationContext(),"Evaliacion Final Angel Manosalvas", Toast.LENGTH_SHORT).show();
        }
        else if(id == R.id.logout){
            Toast.makeText(getApplicationContext(),"LOGOUT", Toast.LENGTH_SHORT).show();
        }
        else if(id == R.id.salir){
            Toast.makeText(getApplicationContext(),"SALIR DEL SISTEMA", Toast.LENGTH_SHORT).show();
            finish();
            System.exit(0);
        }

        return super.onOptionsItemSelected(item);
    }

    //este método se encargará de realizar el control de las opciones del menú
    @SuppressWarnings("StatementWithEmptyBody")
    @Override
    public boolean onNavigationItemSelected(MenuItem item) {
        // Handle navigation view item clicks here.
        int id = item.getItemId();

        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);

        if (id == R.id.home) {
            toolbar.setTitle("HOME");
            layout.home fragment = new layout.home();
            android.support.v4.app.FragmentTransaction fragmentTransaction =
                    getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.fragment_container, fragment);
            fragmentTransaction.commit();
        }
        else if (id == R.id.personas) {
            toolbar.setTitle("PERSONAS");
            layout.personas fragment = new layout.personas();
            android.support.v4.app.FragmentTransaction fragmentTransaction =
                    getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.fragment_container, fragment);
            fragmentTransaction.commit();
        }
        else if (id == R.id.organizacion) {
            toolbar.setTitle("ORGANIZACION");
            layout.organizacion fragment = new layout.organizacion();
            android.support.v4.app.FragmentTransaction fragmentTransaction =
                    getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.fragment_container, fragment);
            fragmentTransaction.commit();
        }
        else if (id == R.id.negocio) {
            toolbar.setTitle("NEGOCIO");
            layout.negocio fragment = new layout.negocio();
            android.support.v4.app.FragmentTransaction fragmentTransaction =
                    getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.fragment_container, fragment);
            fragmentTransaction.commit();
        }
        else if (id == R.id.actiidades) {
            toolbar.setTitle("ACTIVIDADES");
            actividades fragment = new actividades();
            android.support.v4.app.FragmentTransaction fragmentTransaction =
                    getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.fragment_container, fragment);
            fragmentTransaction.commit();
        }
        else if (id == R.id.login) {
            toolbar.setTitle("LOGIN");
            layout.login fragment = new layout.login();
            android.support.v4.app.FragmentTransaction fragmentTransaction =
                    getSupportFragmentManager().beginTransaction();
            fragmentTransaction.replace(R.id.fragment_container, fragment);
            fragmentTransaction.commit();
        }

        DrawerLayout drawer = (DrawerLayout) findViewById(R.id.drawer_layout);
        drawer.closeDrawer(GravityCompat.START);
        return true;
    }

    public void agregarPersonas(View view) {
        Toast.makeText(getApplicationContext(),"PERSONA AGREGADA", Toast.LENGTH_SHORT).show();
    }

    public void agregarOrganizacion(View view) {
        Toast.makeText(getApplicationContext(),"ORGANIZACIÓN AGREGADA", Toast.LENGTH_SHORT).show();
    }

    public void agregarActividad(View view) {
        Toast.makeText(getApplicationContext(),"ACTIVIDAD AGREGADA", Toast.LENGTH_SHORT).show();
    }

    public void agregarNegocio(View view) {
        Toast.makeText(getApplicationContext(),"NEGOCIO AGREGADO", Toast.LENGTH_SHORT).show();
    }

    //al realizar el login se se adquieren los nombre de los EditText que se encuantran en el menu "LOGIN"
    //y se los envía a la tarjeta de identifiación.
    public void login(View view) {

        TextView setUsuario = (TextView) findViewById(R.id.setUsuario);
        TextView setEmail = (TextView) this.findViewById(R.id.setEmail);
        EditText usuario = (EditText) this.findViewById(R.id.usuario);
        EditText email = (EditText) this.findViewById(R.id.email);

        setUsuario.setText(usuario.getText().toString());
        setEmail.setText(email.getText().toString());

        Toast.makeText(getApplicationContext(),"LOGIN REALIZADO", Toast.LENGTH_SHORT).show();
    }
}
