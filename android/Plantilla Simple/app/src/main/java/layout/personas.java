package layout;

import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import ec.com.tas.evaluacionfinal.R;

/*
 * A simple {@link Fragment} subclass.
 * Activities that contain this fragment must implement the
 * {@link personas.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link personas#newInstance} factory method to
 * create an instance of this fragment.
 */
public class personas extends Fragment {

    public personas() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment

        //agregarPersona = (Button) findViewById(R.id.boton1);

        return inflater.inflate(R.layout.fragment_personas, container, false);
    }

}
