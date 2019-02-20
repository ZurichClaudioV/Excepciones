import swal from 'sweetalert2';

export class Alert {
    static error(texto: string) {
        swal.fire({
            title: '',
            text: texto,
            type: 'error',
            toast: true,
            position: 'top',
            timer: 10000,
            showConfirmButton: false,
            customClass: 'custom-swal'
          });
    }
}
