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
 * {@link negocio.OnFragmentInteractionListener} interface
 * to handle interaction events.
 * Use the {@link negocio#newInstance} factory method to
 * create an instance of this fragment.
 */
public class negocio extends Fragment {

    public negocio() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_negocio, container, false);
    }
}
